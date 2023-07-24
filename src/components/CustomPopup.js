import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, Modal, Button } from "react-bootstrap";
import { createGlobalStyle, styled } from "styled-components";
import CustomBadges from "./CustomBadges";
import { useDispatch } from "react-redux";
import { createTask, singleTask, updateTask, deleteTask } from "../slices/tasks";

const GlobalStyle = createGlobalStyle`
  :root {
    --light-grey: #EFF5F5;
    --pale-grey: #AEAEAE;
    --black: #000000;
    --white: #FFFFFF;
    --violent: #7F00FF;
    --dark-violent: #9400D3;
    --light-violent: #CCCCFF;
  }
`;

const Container = styled.div`
    display: block;
    width: 700px;
    padding: 30px;
    border-radius: 15px;
`;

const Content = styled.div`
    font-weight: bold;
`;

const CustomButton = styled(Button)`
    height: 35px;
    padding: 0px 30px;
    font-weight: bold;
    background-color: var(--violent);
    border-radius: 10px;
    box-shadow: 0px 5px var(--light-violent);
    &:hover{
        color: var(--white);
        background-color: var(--dark-violent);
        border: 1px solid var(--dark-violent);
    }
`;

const CancelButton = styled(Button)`
    height: 35px;
    padding: 0px 30px;
    border-radius: 10px;
    color: var(--pale-grey);
    background-color: var(--white);
    border: 1px solid var(--pale-grey);
    &:hover{
        color: var(--white);
        background-color: var(--pale-grey);
        border: 1px solid var(--pale-grey);
    }
`;

const CustomPopup = forwardRef((props, ref) => {
    const initialTaskState = {
        id: null,
        title: "",
        priority: "",
        status: "",
        tag: ""
    };
    const [task, setTask] = useState(initialTaskState);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    const singleFetch = useCallback((id) => {
        dispatch(singleTask({id}))
            .unwrap()
            .then(data => {
                setTask({
                    id: data._id,
                    title: data.title,
                    priority: data.priority,
                    status: data.status,
                    tag: data.tag
                });
            })
            .catch(e => {
                console.log(e);
            });
        props.retrieve();
    },[]);

    useEffect(() => {
        if(props.id) {
            singleFetch(props.id);
        }
    },[props.id]);

    useImperativeHandle(ref, () => ({
        handleShow(){
            setShow(true);
        }
    }));

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const selectBadge = (value) => {
        setTask({ ...task, priority : value });
    };

    const addTask = () => {
        const { title, priority, status, tag } = task;
        dispatch(createTask({ title, priority, status, tag }))
            .unwrap()
            .then(data => {
                setTask({
                    id: data._id,
                    title: data.title,
                    priority: data.priority,
                    status: data.status,
                    tag: data.tag
                });
                props.retrieve();
            })
            .catch(e => {
                console.log(e);
            });
        setShow(false);
    }

    const modifyTask = () => {
        const { title, priority, status, tag } = task;
        dispatch(updateTask({ id: props.id, data: { title, priority, status, tag } }))
            .unwrap()
            .then((data) => {
                props.retrieve();
            })
            .catch((e) => {
                console.log(e);
            });
        setShow(false);
    }

    const removeTask = (id) => {
        dispatch(deleteTask({id}))
            .unwrap()
            .then((data) => {
                props.retrieve();
            })
            .catch(e => {
                console.log(e);
            });
        setShow(false);
    }

    return (
        <Container>
            <GlobalStyle/>
            {props.title === "Add Task" ? (
                <Modal show={show} onHide={handleClose} centered>
                    <div style={{ "padding": "25px" }}>
                        <Modal.Header style={{ "border": "0" }} closeButton>
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ "marginTop": "-10px" }}>
                            <Form.Group >
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold" }}>Task</Form.Label>
                                <Form.Control name="title" style={{ "borderRadius": "10px" }} type="text" placeholder="Enter Task" onChange={(e) => handleInputChange(e)} required/>
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Priority</Form.Label>
                                <CustomBadges handleInput={selectBadge} />
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Status</Form.Label>
                                <Form.Control name="status" style={{ "borderRadius": "10px" }} as="select" custom={"true"} onChange={(e) => handleInputChange(e)} required>
                                    <option value="">Select Any</option>
                                    <option value="To Do">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Form.Control>
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Tag</Form.Label>
                                <Form.Control name="tag" style={{ "borderRadius": "10px" }} as="select" custom={"true"} onChange={(e) => handleInputChange(e)} required>
                                    <option value="">Select Any</option>
                                    <option value="Project">Project</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Office">Office</option>
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{ "border": "0" }}>
                            <CustomButton onClick={() => addTask()}>Add</CustomButton>
                        </Modal.Footer>
                    </div>
                </Modal>
            ) : props.title === "Edit Task" ? (
                <Modal show={show} onHide={handleClose} centered>
                    <div style={{ "padding": "25px" }}>
                        <Modal.Header style={{ "border": "0" }} closeButton>
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ "marginTop": "-5px" }}>
                            <Form.Group>
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold" }}>Task</Form.Label>
                                <Form.Control name="title" style={{ "borderRadius": "10px" }} type="text" placeholder="Enter Task" onChange={(e) => handleInputChange(e)} value={task?.title || ''} required/>
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Priority</Form.Label>
                                <CustomBadges handleInput={selectBadge} value={task?.priority || ''} />
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Status</Form.Label>
                                <Form.Control name="status" style={{ "borderRadius": "10px" }} as="select" custom={"true"} onChange={(e) => handleInputChange(e)} value={task?.status || ''} required>
                                    <option value="">Select Any</option>
                                    <option value="To Do">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Form.Control>
                                <Form.Label style={{ "color": "#808080", "fontWeight": "bold", "marginTop": "10px" }}>Tag</Form.Label>
                                <Form.Control name="tag" style={{ "borderRadius": "10px" }} as="select" custom={"true"} onChange={(e) => handleInputChange(e)} value={task?.tag || ''} required>
                                    <option value="">Select Any</option>
                                    <option value="Project">Project</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Office">Office</option>
                                </Form.Control>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer style={{ "border": "0" }}>
                            <CustomButton onClick={() => modifyTask()}>Edit</CustomButton>
                        </Modal.Footer>
                    </div>
                </Modal>
            ) : props.title === "Delete Task" ? (
                <Modal show={show} onHide={handleClose} centered>
                    <div style={{ "padding": "25px" }}>
                        <Modal.Body style={{ "border": "0", "textAlign": "center" }}>
                            <Content>Are you sure you want to delete this task ?</Content>
                        </Modal.Body>
                        <Modal.Footer style={{ "border": "0", "display": "flex", "justifyContent": "center" }}>
                            <CustomButton onClick={() => removeTask(props.id)}>Delete</CustomButton>
                            <CancelButton onClick={handleClose}>Cancel</CancelButton>
                        </Modal.Footer>
                    </div>
                </Modal>
            ) : ""}
        </Container>
    );
});

export default CustomPopup;
