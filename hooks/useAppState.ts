import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

interface UseAppStateHookProps {
  onAppEnterForeground: () => void;
}

export const useAppState = ({ onAppEnterForeground }: UseAppStateHookProps) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      onAppEnterForeground();
    }

    appState.current = nextAppState;
  };

  return { appState };
};