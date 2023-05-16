import React from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { useGetAllBDMsWorksQuery, useGetAllCRsWorksQuery, useGetAllDevelopersWorksQuery, useGetAllSSMsWorksQuery, useGetAllVideoEditorsWorksQuery } from "state/api";
import Header from "components/Header/Header";
import StatBox from "components/StatBox/StatBox";
import { FormatListNumberedOutlined } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const EmployeesWork = () => {
    const theme = useTheme();
    const bdmworksData = useGetAllBDMsWorksQuery();
    const developmentWorksdata = useGetAllDevelopersWorksQuery();
    const crWorksdata = useGetAllCRsWorksQuery();
    const ssmWorksdata = useGetAllSSMsWorksQuery();
    const videoEditorWorksdata = useGetAllVideoEditorsWorksQuery();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
    const navigate = useNavigate();

    const totalEntries = (bdmworksData?.data?.length + developmentWorksdata?.data?.length + crWorksdata?.data?.length + ssmWorksdata?.data?.length + videoEditorWorksdata?.data?.length)

    return (
        <Box m={isNonMediumScreens ? "1.5rem 2.5rem" : "1rem"} pb={isNonMediumScreens ? '1rem' : '0.5rem'}>
            <Header title="Work Entries" subtitle="List of work entries done by employees." />
            {/* ROW 1 */}
            <Box sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: 'space-between',
                gap: '1rem',
                mt: '1rem',
                width: "100%"
            }}>
                <Button disabled>
                    <StatBox
                        title="Total Work Entries"
                        value={totalEntries || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/bdm works')}>
                    <StatBox
                        title="BDM Work Entries"
                        value={(bdmworksData && bdmworksData?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/developer works')}>
                    <StatBox
                        title="Developer Work Entries"
                        value={(developmentWorksdata && developmentWorksdata?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/content writer works')}>
                    <StatBox
                        title="Content Writer Work Entries"
                        value={(crWorksdata && crWorksdata?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/video editor works')}>
                    <StatBox
                        title="Video Editor Work Entries"
                        value={(videoEditorWorksdata && videoEditorWorksdata?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/social media manager works')}>
                    <StatBox
                        title="Social Media Manager Work Entries"
                        value={(ssmWorksdata && ssmWorksdata?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/graphic designer works')}>
                    <StatBox
                        title="Graphics Designer Work Entries"
                        value={(bdmworksData && bdmworksData?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
                <Button onClick={() => navigate('/developer work entries')}>
                    <StatBox
                        title="Designer Work Entries"
                        value={(bdmworksData && bdmworksData?.data?.length) || []}
                        icon={
                            <FormatListNumberedOutlined
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                </Button>
            </Box>
        </Box>
    );
};

export default EmployeesWork;