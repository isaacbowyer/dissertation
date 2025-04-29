import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../config/firebase";

WebBrowser.maybeCompleteAuthSession();

export const postAuthGoogleLogin = async () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "994826136894-aee800bn8toajcsji454t33o3305v119.apps.googleusercontent.com",
    webClientId:
      "994826136894-0af2htsvlueup794oila6k1gjb62tgou.apps.googleusercontent.com",
    iosClientId:
      "994826136894-u1k32mt7852u3npb9mgffe9707n0qtab.apps.googleusercontent.com",
  });
};
