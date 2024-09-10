import { AppBar, Button, Box, Toolbar, Typography, Container, IconButton, List, ListItem, ListItemIcon, ListItemButton, Divider, ListItemText, Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Home = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {['eee', 'ccc', 'bbb', 'aaa'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      );

    const navigate = useNavigate();
    const Logout = true;

    const handleLogOut = async () => {
        if(Logout){
            navigate('/');
        }
    }

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Welcome
                    </Typography>
                    <Button onClick={handleLogOut} color="inherit">
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <Container maxWidth="sm" sx={{
                mt: 2,
                w: '100vh'
            }}>
                <Box sx={{ bgcolor: '#cfe8fc', 
                            height: '50vh',
                            justifyItems: 'center',
                            borderRadius: 6 }} />
                <Box sx={{ bgcolor: '#cfe8fc', 
                            height: '50vh',
                            mt:1,
                            borderRadius: 6 }} />
            </Container>
        </Box>
        
    </>
  );
};

export default Home;