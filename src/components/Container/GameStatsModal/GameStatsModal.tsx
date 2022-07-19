import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function GameStatsModal(props: {
    open: boolean;
    handleClose: () => void;
    score: number;
    status: string | null;
}) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.status === 'won' ? 'Congrats!' : 'Wa Wa Wa you lost'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your new score <b>{Math.round(props.score)}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="secondary" autoFocus>
                        <b>New Game?</b>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
