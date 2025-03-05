import { StyleSheet, Pressable, View, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import GlassmorphismView from "@/components/GlassmorphismView";
import { useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProfileImageScreen() {
  const router = useRouter();
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Add a profile photo.</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>You can update this at any time.</ThemedText>
   
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
        <View style={styles.iconContainer}>
          <Image
          source={require("@/assets/auth/pfp_icon.png")}
          resizeMode="contain"
          style={styles.pfpButton}
          />
        </View>

        <Pressable style={styles.nextContainer} onPress={() => {router.push("/register/finish");}}>
          <View>
            <GlassmorphismView disableBackground={true}>
              <View /> 
            </GlassmorphismView>
            <ThemedText style={styles.buttonText}>Next</ThemedText>
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
  bottomContainer: {
    position: "absolute", 
    bottom: 65, 
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 20,

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

  iconContainer: {
    alignItems: "center",  
    justifyContent: "center", 
    marginBottom: -40,  
    width: "100%",
  },
  pfpButton: {
    width: 150,  
    height: 150,  
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
    marginTop: 0
},
  });
