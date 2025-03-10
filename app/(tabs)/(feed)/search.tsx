import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import { ThemedText } from "@/components/ThemedText";
import SearchResult from "@/components/feed/SearchResult";

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState("");

  const dummyUsers = [
    {
      id: 1,
      username: "sarahj",
      numFollowers: 1234,
      numFollowing: 567,
      numPosts: 89,
      profilePhoto: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      username: "mikechen",
      numFollowers: 4321,
      numFollowing: 765,
      numPosts: 98,
      profilePhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      username: "emmaw",
      numFollowers: 8765,
      numFollowing: 432,
      numPosts: 76,
      profilePhoto: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: 4,
      username: "jtaylor",
      numFollowers: 5432,
      numFollowing: 876,
      numPosts: 123,
      profilePhoto: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: 5,
      username: "sgarcia",
      numFollowers: 9876,
      numFollowing: 543,
      numPosts: 234,
      profilePhoto: "https://randomuser.me/api/portraits/women/5.jpg",
    },
  ];

  const handleSearchChange = (text: string) => {
    setSearchValue(text);
  };

  return (
    <ThemedView style={styles.searchScreen}>
      {/* HEADER: Search Input */}
      <ThemedView style={styles.header}>
        {/* 'SEARCH INPUT' */}
        <GlassmorphismTextInput
          value={searchValue}
          placeholder="Search for a friend..."
          iconSymbol={"magnifyingglass"}
          iconSize={24}
          onChangeText={handleSearchChange}
          keyboardType="default"
          containerStyle={styles.searchInput}
          shadowEnabled={true}
        />
      </ThemedView>
      <ThemedText style={styles.resultsLabel}>
        {dummyUsers.length} Results
      </ThemedText>
      {/* SEARCH RESULTS: Results */}
      <ScrollView
        style={styles.searchResults}
        contentContainerStyle={styles.searchResultsContent}
      >
        {dummyUsers.map((user) => (
          <SearchResult
            key={user.id}
            username={user.username}
            numFollowers={user.numFollowers}
            numFollowing={user.numFollowing}
            numPosts={user.numPosts}
            profilePhoto={user.profilePhoto}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchScreen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
    paddingVertical: 30,
  },
  header: {
    flexBasis: 50,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    alignItems: "center",
    borderRadius: 50,
  },
  resultsLabel: {
    fontSize: 14,
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: -20,
  },
  searchResults: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#e9e9e9",
  },
  searchResultsContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 1,
  },
  resultText: {
    fontSize: 14,
  },
});
