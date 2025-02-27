# Spotify Authentication Implementation

This document explains how Spotify authentication is implemented in our app, allowing users to authenticate once and maintain their session across app restarts.

## Architecture Overview

Our implementation uses a combination of:

1. **Convex Backend**: Stores and manages authentication tokens securely
2. **React Query**: Handles client-side data fetching, caching, and state management
3. **Custom Hooks**: Provides a clean API for components to interact with Spotify

## Key Components

### 1. Convex Schema and Functions

- `spotifyTokens` table: Stores access tokens, refresh tokens, and expiration dates
- `saveTokens` mutation: Saves tokens after initial authentication
- `getTokens` query: Retrieves tokens and checks if they need refreshing
- `refreshToken` action: Handles token refresh when needed

### 2. Authentication Hook

The `useSpotifyAuth` hook provides:

- Authentication state (`isAuthenticated`, `isLoading`)
- Authentication method (`authenticateWithSpotify`)
- Token management (`getAccessToken`)

### 3. API Hooks

Various hooks for Spotify API functionality:

- `useSpotifySearch`: Search for tracks
- `useUserPlaylists`: Get user's playlists
- `useCreatePlaylist`: Create a new playlist
- `useAddTracksToPlaylist`: Add tracks to a playlist
- `useUserProfile`: Get user profile information
- `useSpotifyApi`: Generic hook for custom API calls

## Authentication Flow

1. **Initial Authentication**:
   - User clicks "Connect to Spotify" button
   - OAuth flow is initiated via `authenticateWithSpotify`
   - Tokens are saved to Convex via `saveTokens` mutation

2. **Subsequent App Usage**:
   - App fetches tokens from Convex via `getTokens` query
   - If tokens are valid, they're used for API calls
   - If tokens are expiring soon, they're refreshed automatically

3. **Token Refresh**:
   - When a token is about to expire, `refreshToken` action is called
   - New access token is obtained using the refresh token
   - Updated tokens are saved to Convex

## Usage in Components

### Authentication Button

```tsx
import SpotifyAuthButton from "@/components/spotify/spotify-auth-button";

function MyComponent() {
  return (
    <View>
      <Text>Connect your Spotify account:</Text>
      <SpotifyAuthButton />
    </View>
  );
}
```

### Searching for Tracks

```tsx
import { useSpotifySearch } from "@/hooks/useSpotify";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const { data: tracks, isLoading } = useSpotifySearch(query);

  // Render search results
}
```

## Benefits of This Approach

1. **Persistent Authentication**: Users only need to authenticate once
2. **Automatic Token Refresh**: Tokens are refreshed behind the scenes
3. **Separation of Concerns**: Clean separation between authentication, API logic, and UI
4. **Type Safety**: Full TypeScript support throughout the implementation
5. **Optimized Performance**: React Query provides caching and request deduplication