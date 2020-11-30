import ConnectyCube from 'connectycube'
import appConfig from '../appConfig.json'

class AuthService {
  async init() {
    await ConnectyCube.init(...appConfig.connectyCubeConfig);
  }
  
  async createSession(userCredentials) {
      await ConnectyCube.createSession(userCredentials)
          .then((session) => {
              console.log('#createSession success: ', session);
          })
          .catch((error) => {
              console.log('#createSession error: ', error);
          });
  }
}

const authService = new AuthService();

Object.freeze(authService);

export default authService