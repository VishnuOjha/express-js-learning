import { getUserById, createUserHandler } from "../handlers/user.mjs";
import * as validator from "express-validator";
import * as helpers from "../utils/helpers.mjs"

jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid Field" }]),
  })),
  matchedData: jest.fn(() => ({
    username: "test",
    password: "test123",
    displayName: "test_name",
  })),
}));


jest.mock("../utils/helpers.mjs", () => ({
    hashPassword: jest.fn((password) =>  `hashed_${password}`)
}))

const mockRequest = {
  findUserByIndex: 2,
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn(() => mockResponse),
};

describe("get user", () => {
  it("should get user by id", () => {
    getUserById(mockRequest, mockResponse);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 3,
      username: "clark",
      displayName: "Clark",
      password: "clark123",
    });
    expect(mockResponse.send).toHaveBeenCalledTimes(1);
  });

  it("should call sendStatus with 404 when user not found", () => {
    const copyMockRequest = { ...mockRequest, findUserByIndex: 100 };

    getUserById(copyMockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
    expect(mockResponse.sendStatus).toHaveBeenCalledTimes(1);
    expect(mockResponse.send).not.toHaveBeenCalled();
  });
});

describe("create user", () => {
  const mockRequest = {};

  it("should return status of 400 when there are errors", async () => {
    await createUserHandler(mockRequest, mockResponse);
    // expect(validator.validationResult).toHaveBeenCalled();
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([{ msg: "Invalid Field" }]);
  });

  it("should return status of 201 and the user created", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    await createUserHandler(mockRequest, mockResponse);
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
  });
});
