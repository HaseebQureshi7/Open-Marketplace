export interface snackDataTypes {
  text?: string;
  open: boolean;
}

export interface SnackStateTypes {
  snackData: snackDataTypes;
  setSnackData: (data: snackDataTypes) => void;
}
