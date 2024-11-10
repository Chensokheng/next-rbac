import { _createNewLoginUserMutation } from "./_createNewLoginUser.mutation";
import { validateCreateNewUserParams } from "@/src/validation/users";
import { _dbCreateNewLoginUser } from "@/src/data-access/user";
import { generateResponse } from "@/src/utils/common";
import { User } from "@supabase/supabase-js";

// Mocking the imported dependencies
jest.mock("server-only", () => ({}));
jest.mock("@/src/validation/users");
jest.mock("@/src/data-access/user");
jest.mock("@/src/utils/common");

describe("_createNewLoginUserMutation", () => {
	const mockUser = {
		id: "user-id-123",
		email: "user@example.com",
		user_metadata: {
			avatar_url: "https://example.com/avatar.jpg",
			user_name: "exampleUser",
		},
	} as unknown as User;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should call validateCreateNewUserParams, _dbCreateNewLoginUser, and generateResponse", async () => {
		// Arrange: Set up the mocks to return any value, as we only care about invocation
		(validateCreateNewUserParams as jest.Mock).mockResolvedValue({});
		(_dbCreateNewLoginUser as jest.Mock).mockResolvedValue({});
		(generateResponse as jest.Mock).mockReturnValue({});

		// Act: Call the function
		await _createNewLoginUserMutation(mockUser);

		// Assert: Verify each function was called at least once
		expect(validateCreateNewUserParams).toHaveBeenCalled();
		expect(_dbCreateNewLoginUser).toHaveBeenCalled();
		expect(generateResponse).toHaveBeenCalled();
	});
});
