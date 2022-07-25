import React, { useState, MouseEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import HelpOutLinedIcon from '@mui/icons-material/HelpOutlineRounded';
import './Header.css';
import { NavLink } from 'react-router-dom';

const helpText =
    'To play the game, guess the word, and click  the verify button, you have 4 tries, every try it will let you know which letters do are included on the word. Good Luck!';
export default function Header() {
    const [openHelp, setOpenHelp] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="Header">
            <div className="navBar">
                <Typography className="menuItem">
                    <Tooltip title={helpText} open={openHelp}>
                        <IconButton
                            color="primary"
                            size="small"
                            sx={{ ml: 2 }}
                            aria-label="help"
                            onClick={() => setOpenHelp(!openHelp)}
                        >
                            <HelpOutLinedIcon sx={{ width: 32, height: 32 }} style={{ color: 'gray' }} />
                        </IconButton>
                    </Tooltip>
                </Typography>
                <div className={'menuItem title'}>
                    <NavLink to="/" className="navLink">
                        {' '}
                        WORDS{' '}
                    </NavLink>
                </div>
                <Tooltip className="menuItem" title="Account settings">
                    <IconButton
                        onClick={handleMenuClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </div>
            <Divider />
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar />
                    <NavLink to="/stats" className="navLink">
                        Stats
                    </NavLink>
                </MenuItem>
                <MenuItem>DarkMode</MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}
