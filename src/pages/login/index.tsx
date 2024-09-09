// ** React Imports
import { ReactNode, useState } from "react";

// ** MUI Components
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import LoadingButton from "@mui/lab/LoadingButton";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustrationsV1";
import { FormHelperText } from "@mui/material";
import { useAuth } from "src/hooks/useAuth";
import { parseServerError } from "src/utils/utility";

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: 450 },
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  email: "litipij744@janfab.com",
  password: "00000000",
};

const LoginV1 = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    auth.login({ email, password, rememberMe }, (error) => {
      setError("email", {
        type: "manual",
        message: parseServerError(error, "Email or Password is invalid"),
      });
    });
  };

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(13, 7, 6.5)} !important` }}
        >
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={47}
              fill="none"
              height={26}
              viewBox="0 0 268 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fill={theme.palette.primary.main}
                transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
              />
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fillOpacity="0.4"
                fill="url(#paint0_linear_7821_79167)"
                transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
              />
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fill={theme.palette.primary.main}
                transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
              />
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fill={theme.palette.primary.main}
                transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
              />
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fillOpacity="0.4"
                fill="url(#paint1_linear_7821_79167)"
                transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
              />
              <rect
                rx="25.1443"
                width="50.2886"
                height="143.953"
                fill={theme.palette.primary.main}
                transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
              />
              <defs>
                <linearGradient
                  y1="0"
                  x1="25.1443"
                  x2="25.1443"
                  y2="143.953"
                  id="paint0_linear_7821_79167"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  y1="0"
                  x1="25.1443"
                  x2="25.1443"
                  y2="143.953"
                  id="paint1_linear_7821_79167"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <Typography
              variant="h6"
              sx={{
                ml: 2,
                lineHeight: 1,
                fontWeight: 700,
                fontSize: "1.5rem !important",
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ mb: 1.5, fontWeight: 600, letterSpacing: "0.18px" }}
            >
              {`Welcome to ${themeConfig.templateName}!`}
            </Typography>
            <Typography variant="body2">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="admin@materialize.com"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                htmlFor="auth-login-v2-password"
                error={Boolean(errors.password)}
              >
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label="Password"
                    onChange={onChange}
                    id="auth-login-v2-password"
                    error={Boolean(errors.password)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon
                            icon={
                              showPassword
                                ? "mdi:eye-outline"
                                : "mdi:eye-off-outline"
                            }
                            fontSize={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: "error.main" }} id="">
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                label="Remember Me"
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
              />
            </Box>
            <LoadingButton
              loading={auth.loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mb: 7 }}
            >
              Login
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginV1.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginV1;
