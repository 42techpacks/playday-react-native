import { StyleSheet, View, Image, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import GlassmorphismView from "@/components/GlassmorphismView";
import { useRouter } from "expo-router";

export default function FinishScreen() {
  const user = useQuery(api.auth.getCurrentUser);
  const router = useRouter();
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>You're all set!.</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>Start curating your sound today.</ThemedText>
        
      <View style={styles.profileContainer}>
        <GlassmorphismView viewStyle ={styles.glassView}>
          <Image
            source={require("@/assets/auth/profile.png")}
            resizeMode="contain"
            style={styles.profileImage}/>
          <ThemedText style={styles.username}>
            {user?.profile?.username ? `@${user.profile.username}` : ""}
          </ThemedText>
        </GlassmorphismView >
      </View>

      <View style={styles.bottomContainer}>
        <ThemedText style={styles.connected} >
          Spotify {!!user?.spotifyToken ? "connected!✅ " : "not connected! ❌"}
        </ThemedText>

        <Pressable style={styles.nextContainer}
          onPress={() => {router.push("/register/onboard");}}>
          <View>
            <GlassmorphismView disableBackground={true}>
              <View /> 
            </GlassmorphismView>
            <ThemedText style={styles.buttonText}>Finish</ThemedText>
          </View>
          </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
  },
  vinylContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontWeight: 400,
      fontSize: 21,
      marginTop: 15
   },
    subtitle: {
      fontSize: 15,
      fontWeight: 300,
      color: "#000",
      fontFamily: "Helvetica-Regular",
      marginBottom: 50
  },

  username:{
    position: "absolute", 
    bottom: 20, 
    fontSize: 16,
    textAlign: "center",
  },
  profileContainer: {
    width: 250, 
    height: 300, 
    borderRadius: 20, 
    alignSelf: "center", 
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0
  },
  profileImage: {
    width: "60%", 
    height: 250, 
  },
  glassView: {
    alignItems: "center", 
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  finishText: {
    marginTop: 500,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 5,
  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "white", 
    textAlign: "center",
    fontSize: 20,
  },
  nextContainer: {
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 65,
    backgroundColor: "black",
    borderRadius: 50,
    paddingHorizontal: 20, 
    overflow: "hidden", 
    marginTop: 10
  },
  connected:{
    fontFamily: "Helvetica",
    color: "gray", 
    textAlign: "center",
    fontSize: 20,
  },
  bottomContainer: {
    position: "absolute", 
    bottom: 65, 
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 20,
    

  },
});
