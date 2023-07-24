import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTask } from "../slices/tasks";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Badge } from "react-bootstrap";
import Flexbox from "flexbox-react";
import { createGlobalStyle, styled } from "styled-components";
import CustomPopup from "../components/CustomPopup";

const GlobalStyle = createGlobalStyle`
  :root {
    --light-grey: #EFF5F5;
    --dark-grey: #C5C8D7;
    --black: #000000;
    --white: #FFFFFF;
    --red: #FF0000;
    --violent: #7F00FF;
    --dark-violent: #9400D3;
    --light-violent: #CCCCFF;
  }
`;

const FlexContainer = styled(Flexbox)`
  background-color: var(--light-grey);
  padding: 0;
`;

const FlexHeader = styled(Flexbox)`
  color: var(--black);
  height: 100px;
`;

const FlexSecOne = styled(Flexbox)`
  width: 50%;
  height: 100px;
  color: var(--black);
  padding: 10px 0px;
  font-weight: bold;
  font-size: 250%;
`;

const FlexSecTwo = styled(Flexbox)`
  padding: 30px;
  width: 50%;
  height: 100px;
`;

const FlexContent = styled(Flexbox)`
  width: 63%;
  min-height: 80px;
  margin: 40px 280px;
  background-color: var(--white);
  border-radius: 30px;
  border: 3px solid var(--light-grey);
`;

const FlexCol = styled(Flexbox)`
  width: 30%;
  height: 100px;
  color: var(--black);
  padding: 10px 0px;
  font-weight: bold;
`;

const AddButton = styled(Button)`
  padding: 0px 30px;
  font-weight: bold;
  color: var(--white);
  background-color: var(--violent);
  border-radius: 10px;
  box-shadow: 0px 5px var(--light-violent);
  &:hover{
    color: var(--white);
    background-color: var(--dark-violent);
    border: 1px solid var(--dark-violent);
  }
`;

const StatusBadge = styled(Badge)`
    margin-top: 5px;
    padding: 10px 30px;
    color: var(--black) !important;
    background-color: var(--dark-grey) !important;
`;

const Edit = styled(FaEdit)`
    color: var(--black);
    &:hover{
        cursor: pointer;
    }
`;

const Trash = styled(FaTrashAlt)`
    color: var(--red);
    &:hover{
        cursor: pointer;
    }
`;

const FullCircle = styled.div`
    height: 25px;
    width: 25px;
    border: 3px solid var(--violent);
    background-color: var(--white);
    border-radius: 50%;
    display: inline-block;
`;

const HalfCircle = styled.div`
    height: 25px;
    width: 25px;
    border-right: 3px solid var(--violent);
    border-bottom: 3px solid var(--violent);
    border-top: 3px solid var(--violent);
    border-left: 3px solid var(--dark-grey);
    background-color: var(--white);
    border-radius: 50%;
    display: inline-block;
`;

const EmptyCircle = styled.div`
    height: 25px;
    width: 25px;
    border: 3px solid var(--dark-grey);
    background-color: var(--white);
    border-radius: 50%;
    display: inline-block;
`;

const TaskList = () => {
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const modalRef = useRef(null);

    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(allTask());
    },[dispatch]);

    useEffect(() => {
        initFetch();
    }, [dispatch, initFetch]);

    const createTask = () => {
        modalRef.current.handleShow();
        setTitle("Add Task");
    }

    const editTask = (id) => {
        modalRef.current.handleShow();
        setTitle("Edit Task");
        setId(id);
    }

    const deleteTask = (id) => {
        modalRef.current.handleShow();
        setTitle("Delete Task");
        setId(id);
    }

    return (
        <>
            <FlexContainer flexDirection={"column"}>
                <GlobalStyle />
                <FlexHeader flexDirection={"row"}>
                    <FlexSecOne
                        flexDirection={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        Task List
                    </FlexSecOne>
                    <FlexSecTwo flexDirection={"row"} justifyContent={"center"}>
                        <AddButton onClick={() => createTask()}>
                        <FaPlus />
                        &nbsp; Add Task
                        </AddButton>
                    </FlexSecTwo>
                </FlexHeader>
                {tasks && tasks.map((task, index) => (
                    <FlexContent flexDirection={"row"} key={index}>
                        <FlexCol
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            style={{ color: "#C5C8D7" }}
                            >
                            Task
                            </Flexbox>
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            >
                            {task.title}
                            </Flexbox>
                        </FlexCol>
                        <FlexCol
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            style={{ color: "#C5C8D7" }}
                            >
                            Priority
                            </Flexbox>
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            style={{ color: "#FF0000" }}
                            >
                            {task.priority}
                            </Flexbox>
                        </FlexCol>
                        <FlexCol
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            >
                            <StatusBadge>{task.status}</StatusBadge>
                            </Flexbox>
                        </FlexCol>
                        <FlexCol
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            >
                            {task.status === 'Done' ? <FullCircle></FullCircle> : task.status === 'In Progress' ? <HalfCircle></HalfCircle> : <EmptyCircle></EmptyCircle>}
                            </Flexbox>
                        </FlexCol>
                        <FlexCol
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            style={{ color: "#C5C8D7" }}
                            >
                            Tag
                            </Flexbox>
                            <Flexbox
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            >
                            {task.tag}
                            </Flexbox>
                        </FlexCol>
                        <FlexCol
                            flexDirection={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Flexbox
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={"10px"}
                            onClick={() => editTask(task._id)}
                            >
                                <Edit size={"1.5em"}/>
                            </Flexbox>
                            <Flexbox
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            padding={"10px"}
                            onClick={() => deleteTask(task._id)}
                            >
                                <Trash size={"1.5em"}/>
                            </Flexbox>
                        </FlexCol>
                    </FlexContent>
                ))}
            </FlexContainer>
            <CustomPopup ref={modalRef} id={id} title={title} retrieve={initFetch} />
        </>
    );
};

export default TaskList;
