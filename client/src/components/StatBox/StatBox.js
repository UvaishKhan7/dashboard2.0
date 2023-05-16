import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width={isNonMediumScreens ? '14rem' : '10rem'}
      height='8rem'
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {icon}
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </Typography>
      </Box>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;