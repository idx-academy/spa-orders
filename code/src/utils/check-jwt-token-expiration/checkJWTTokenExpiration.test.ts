import checkJWTTokenExpiration from "@/utils/check-jwt-token-expiration/checkJWTTokenExpiration";

const mockCurrentDate = new Date("2024-01-01T10:00:00Z");

// Expired date: 2024-01-01T10:30:00Z (in the future)
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTA1MDAwLCJleHAiOjE3MDQxMDUwMDB9.cVeYoWJ3o1yJdvIaB8tdCAkIAzu5JBdMgkGz6VgNzj0";

// Expired date: 2024-01-01T09:30:00Z (in the past)
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTAxNDAwLCJleHAiOjE3MDQxMDE0MDB9.gTjT3TngJyUV0msPIe6PqcqULXd_VWXkaalnDPtuCk4";

// Expired date: 2024-01-01T10:00:00Z (same as current timestamp)
const immediateToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTAzMjAwLCJleHAiOjE3MDQxMDMyMDB9.9LrdTgC8EFnARyr7jfj52yaI_EOXC-dRtRUrMvfZBK8";

const tokenWithoutExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjA5MjI5NzAwfQ.qb-GC7kxfK3ZTk9o31kM4P2GMPg1j5jTz8qkAqJzal4";

describe("checkJWTTokenExpiration", () => {
  beforeEach(() => {
    jest.spyOn(Date, "now").mockImplementation(() => mockCurrentDate.getTime());
  });

  test("returns false if jwt token is valid and not expired", () => {
    expect(checkJWTTokenExpiration(validToken)).toBeFalsy();
  });

  test("returns true if passed value is not a valid jwt token", () => {
    expect(checkJWTTokenExpiration("123")).toBeTruthy();
  });

  test("returns true if jwt token does not have 'exp' field", () => {
    expect(checkJWTTokenExpiration(tokenWithoutExp)).toBeTruthy();
  });

  test("returns true if jwt token is expired", () => {
    const expiredTimestamp = new Date("2024-01-02T10:00:00Z").getTime();
    jest.spyOn(Date, "now").mockImplementation(() => expiredTimestamp);

    expect(checkJWTTokenExpiration(expiredToken)).toBeTruthy();
  });

  it("returns true if expired date is strict equal to current timestamp", () => {
    expect(checkJWTTokenExpiration(immediateToken)).toBeTruthy();
  });
});
