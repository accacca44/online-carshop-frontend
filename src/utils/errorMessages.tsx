type ErrorMapping = {
  [key: string]: {
    [errorCode: number]: string;
  };
};

const errorMessagesMap: ErrorMapping = {
  Login: {
    401: 'You have bad credentials.',
    400: 'Please Fill Out the form',
    404: 'User with given username does not exist',
  },
  Register: {
    400: 'Please complete the form',
    401: 'You are unauthorized to access user information.',
  },
  Logout: {
    401: 'You are unauthorized to access user information.',
  },
  User: {
    400: 'Please insert valid information',
    401: 'You are unauthorized to access user information.',
    403: 'You are unauthorized to access user information.',
    404: 'User does not exist',
  },
  Car: {
    400: 'Please insert valid information',
    401: 'You are unauthorized to access car information.',
    403: 'You are unauthorized to access car information.',
    404: 'Car does not exist',
  },
};

export function mapErrorCodeToMessage(scenario: string, errorCode: number): string {
  return errorMessagesMap[scenario]?.[errorCode] || 'Unknown Error: An unexpected error occurred.';
}
