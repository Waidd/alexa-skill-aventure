import * as Alexa from "ask-sdk-core";
import { Response } from "ask-sdk-model";

import texts from "./fr-FR.json";

import { World } from "./world/World";

const world = World.createWorld();

const logger = {
	/* tslint:disable no-console */
	error: (...args: any[]) => console.error(...args),
	info: (...args: any[]) => console.log(...args),
	/* tslint:enable no-console */
};

function startAventure(attributesManager: Alexa.AttributesManager): void {
	const attributes = attributesManager.getSessionAttributes();

	attributes.roomID = 0;
	attributes.fromRoomID = -1;

	attributesManager.setSessionAttributes(attributes);
}

function getRoomDescription(attributesManager: Alexa.AttributesManager): string {
	const { roomID, fromRoomID } = attributesManager.getSessionAttributes();

	const description = world.getRoomDescription(roomID);
	const directions = world.getRoomDirections(roomID, fromRoomID);

	return `${description} ${directions}`;
}

function moveIntoNextRoom(attributesManager: Alexa.AttributesManager, direction: string): void {
	const attributes = attributesManager.getSessionAttributes();

	const room = world.getRoomByID(attributes.roomID);
	const newRoomID = room.resolveDirection(direction);
	logger.info("moveIntoNextRoom", room, direction, newRoomID);

	if (newRoomID >= 0) {
		attributes.roomID = newRoomID;
		attributesManager.setSessionAttributes(attributes);
	}
}

/* INTENT HANDLERS */
const LaunchRequestHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		return handlerInput.responseBuilder
			.speak(texts.WELCOME)
			.reprompt(texts.HELP)
			.getResponse();
	},
};

const HelpHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		logger.info("HelpHandler", "canHandle");
		const request = handlerInput.requestEnvelope.request;
		return request.type === "IntentRequest" &&
			request.intent.name === "AMAZON.HelpHandler";
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		logger.info("HelpHandler", "handle");
		return handlerInput.responseBuilder
			.speak(texts.HELP)
			.reprompt(texts.HELP)
			.getResponse();
	},
};

const ExitHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		logger.info("ExitHandler", "canHandle");
		const attributes = handlerInput.attributesManager.getSessionAttributes();
		const request = handlerInput.requestEnvelope.request;

		return request.type === `IntentRequest`
			&& (
				request.intent.name === "AMAZON.StopIntent"
				|| request.intent.name === "AMAZON.PauseIntent"
				|| request.intent.name === "AMAZON.CancelIntent"
			);
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		logger.info("ExitHandler", "handle");
		return handlerInput.responseBuilder
			.speak(texts.EXIT)
			.getResponse();
	},
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		logger.info("SessionEndedRequestHandler", "canHandle");
		return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		logger.info(
			"SessionEndedRequestHandler",
			"handle",
			`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`,
		);
		return handlerInput.responseBuilder.getResponse();
	},
};

const StartAdventureIntent = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		logger.info("StartAdventureIntent", "canHandle");

		const request = handlerInput.requestEnvelope.request;
		return request.type === "IntentRequest" &&
		(request.intent.name === "StartAdventureIntent" || request.intent.name === "AMAZON.StartOverIntent");
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		logger.info("StartAdventureIntent", "handle");

		startAventure(handlerInput.attributesManager);
		const speech = getRoomDescription(handlerInput.attributesManager);

		const response = handlerInput.responseBuilder;
		return response
			.speak(speech)
			.reprompt(speech)
			.getResponse();
	},
};

const DirectionIntent = {
	canHandle(handlerInput: Alexa.HandlerInput): boolean {
		logger.info("DirectionIntent", "canHandle");

		const request = handlerInput.requestEnvelope.request;
		const attributes = handlerInput.attributesManager.getSessionAttributes();

		return request.type === "IntentRequest" &&
			(request.intent.name === "DirectionIntent");
	},
	handle(handlerInput: Alexa.HandlerInput): Response {
		logger.info("DirectionIntent", "handle");
		logger.info("DirectionIntent", "slot", (handlerInput.requestEnvelope.request as any).intent.slots.direction.value);

		const direction = (handlerInput.requestEnvelope.request as any).intent.slots.direction.value;
		moveIntoNextRoom(handlerInput.attributesManager, direction);

		const description = getRoomDescription(handlerInput.attributesManager);

		const response = handlerInput.responseBuilder;
		return response
			.speak(description)
			.reprompt(description)
			.getResponse();
	},
};

const ErrorHandler = {
	canHandle(): boolean {
		logger.info("ErrorHandler", "canHandle");
		return true;
	},
	handle(handlerInput: Alexa.HandlerInput, error: Error): Response {
		logger.info("ErrorHandler", "handle");
		logger.info(`Error handled: ${JSON.stringify(error)}`);
		logger.info(`Handler Input: ${JSON.stringify(handlerInput)}`);

		return handlerInput.responseBuilder
			.speak(texts.HELP)
			.reprompt(texts.HELP)
			.getResponse();
	},
};

/* LAMBDA SETUP */
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		LaunchRequestHandler,
		HelpHandler,
		ExitHandler,
		SessionEndedRequestHandler,
		StartAdventureIntent,
		DirectionIntent,
	)
	.addErrorHandlers(ErrorHandler)
	.lambda();
