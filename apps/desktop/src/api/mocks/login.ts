import { SOURCE } from './sources';

export const loginData = () => {
  return {
    status: 200,
    success: true,
    message: '로그인 성공',
    data: {
      userType: SOURCE.getUserType(),
      userId: SOURCE.getId(),
      userImageFile: SOURCE.getImage(),
      userName: SOURCE.getUser(),
      userContact: '010-0000-0000',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MjMsImlhdCI6MTY3NjE2OTQ5MCwiZXhwIjoxNjc2MTczMDkwfQ.vXB5mz6xUHjzziXuDBpfZ9hsL7UY_VAYi-VDYtHdoNg',
    },
  };
};
