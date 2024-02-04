import {
  Box,
  Autocomplete as MUIAutocomplete,
  TextField,
  useTheme,
} from "@mui/material";

interface AutocompleteProps {
  optionsData: any[];
  label: string;
  name?: string;
  value?: string;
  variant?: "standard" | "filled" | "outlined";
  helperText?: string | boolean | undefined;
  placeholder?: string;
  error?: boolean;
  multiline?: boolean;
  maxRows?: number;
  type?: string;
  onChange?: any;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  optionsData,
  label,
  name,
  value,
  variant = "filled",
  helperText,
  placeholder,
  error = false,
  multiline = false,
  maxRows = 0,
  type,
  onChange,
}) => {
  const theme = useTheme();

  const options = optionsData.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      ...option,
    };
  });

  return (
    <MUIAutocomplete
      isOptionEqualToValue={(option, value) => option.title === value.title}
      onChange={onChange}
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          label={label}
          name={name}
          value={value}
          helperText={helperText}
          placeholder={placeholder}
          variant={variant}
          error={error}
          multiline={multiline}
          maxRows={maxRows}
          type={type}
          // onChange={onChange}
          {...params}
        />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <Box
            sx={{
              position: "sticky",
              top: "-8px",
              padding: "4px 10px",
              color: theme.palette.primary.main,
            }}
          >
            {params.group}
          </Box>
          <ul style={{ padding: 0 }}>{params.children}</ul>
        </li>
      )}
    />
  );
};

export default Autocomplete;
