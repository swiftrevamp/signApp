import crypto from 'node:crypto';
export default async function loginUser(request) {
  const username = request.params.email;
  const password = request.params.password;
console.log(username,password,"Testing Login")
  if (username && password) {
    try {
      // Pass the username and password to logIn function
      const user = await Parse.User.logIn(username, password);
       console.log('userTest ', user);
      if (user) {
        const _user = user?.toJSON();
        return {
          ..._user,
        };
      } else {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'user not found.');
      }
    } catch (err) {
      console.log('err in login user', err);
      throw err;
    }
  } else {
    throw new Parse.Error(Parse.Error.PASSWORD_MISSING, 'username/password is missing.');
  }
}
