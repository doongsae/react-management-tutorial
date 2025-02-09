import React from 'react';
import { post } from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, withStyles, Button } from '@material-ui/core';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',

            open: false
        }
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return post(url, formData, config);
    }

    handleFormSubmit = (eve) => {
        eve.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })

        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',    
            open: false
        })
    }

    handleFileChange = (eve) => {
        this.setState({
            file: eve.target.files[0],
            fileName: eve.target.value
        })
    }

    handleValueChange = (eve) => {
        let nextState = {};
        nextState[eve.target.name] = eve.target.value;
        this.setState(nextState);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',

            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                            추가
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);