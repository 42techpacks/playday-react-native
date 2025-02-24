import {
  useSpotifyActions,
  useSpotifyToken,
  useSpotifyAuthentication,
} from "@/hooks/useSpotify";
import { Button } from "react-native";

export default function SpotifyAuthButton() {
  const { authenticateAsync } = useSpotifyAuthentication();
  const { setAccessToken } = useSpotifyActions();
  const currentToken = useSpotifyToken();

  async function handleAuthenticatePress() {
    try {
      const session = await authenticateAsync({
        scopes: [
          "ugc-image-upload",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
          "app-remote-control",
          "streaming",
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-private",
          "playlist-modify-public",
          "user-follow-modify",
          "user-follow-read",
          "user-top-read",
          "user-read-recently-played",
          "user-library-modify",
          "user-library-read",
          "user-read-email",
          "user-read-private",
        ],
      });

      setAccessToken(session.accessToken);
    } catch (error) {
      if (error instanceof Error) {
        // You might want to use a proper error handling mechanism here
        setAccessToken(null);
        console.error(error.message);
      }
    }
  }

  return (
    <Button
      onPress={handleAuthenticatePress}
      title={currentToken ? "Connected to Spotify" : "Authenticate w/ Spotify"}
    />
  );
}
