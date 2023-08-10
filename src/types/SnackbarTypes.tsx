export interface SnackbarTypes {
  open: boolean;
  text?: string;
  severity?: "Success" | "Info" | "Warning" | "Error";
}

export interface SnackStateProps {
  snackData: SnackbarTypes;
  setSnackData: (data: SnackbarTypes) => void;
}
