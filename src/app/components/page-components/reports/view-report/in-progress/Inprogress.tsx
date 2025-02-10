import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import searchIcon from "../../../../assets/searchIcon.svg";
import TaskIcon from "../../../../assets/taskIcon.svg";

const TaskListData = [
  {
    taskName: "TaskName1",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
  {
    taskName: "TaskName2",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
  {
    taskName: "TaskName3",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
  {
    taskName: "TaskName4",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
  {
    taskName: "TaskName5",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
  {
    taskName: "TaskName6",
    taskDescription:
      "This is a sample description for the task This is a sample description for the task",
    taskStatus: "Ongoing",
  },
];

const Inprogress = () => {
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // const filteredTasks = TaskListData.filter((task) =>
  //   task.taskName.toLowerCase().includes(search.toLowerCase())
  // );

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/tasks/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Map API data to match UI format
        const mappedTasks = data.map((task: any) => ({
          _id: task._id,
          taskType: task.task_type.toLowerCase().includes("critical")
            ? "critical"
            : task.task_type.toLowerCase().includes("key")
              ? "key"
              : "supporting",
          taskName: task.name,
          taskDescription: task.description,
          dueDate: {
            day: new Date(task.due_date).getDate().toString().padStart(2, "0"),
            month: (new Date(task.due_date).getMonth() + 1)
              .toString()
              .padStart(2, "0"),
            year: new Date(task.due_date).getFullYear().toString(),
          },
          tags: task.tags,
          priority: task.priority.split(" ")[0], // Remove 'Priority' suffix
          taskStatus: task.status,
        }));

        setTasks(mappedTasks);
      } else {
        console.error("Failed to fetch tasks:", data.error);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  
  const getPriorityCol = (priority: any) => {
    if (priority === "to do") {
      return "#E8B500";
    } else if (priority === "in progress") {
      return "#E8B500";
    } else {
      return "#03A500";
    }
  };

  const getPriorityBackgroundCol = (priority: any) => {
    if (priority === "to do") {
      return "#FFFAE5";
    } else if (priority === "in progress") {
      return "#FFFAE5";
    } else {
      return "#E7FFFC";
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.Inprogress}>
      <div className={styles.tasksearchcont}>
        <div className={styles.searchbar}>
          <Image
            src={searchIcon}
            width={26}
            height={26}
            alt="none"
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.taskcont}>
        <p className={styles.taskHeader}>My Tasks</p>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((taskItems, index) => (
            <div key={index} className={styles.taskBox}>
              <div className={styles.taskboxleft}>
                <Image src={TaskIcon} width={24} height={24} alt="none" />
                <div className={styles.taskInfo}>
                  <p className={styles.taskBoxHeader}>{taskItems.taskName}</p>
                  <p className={styles.taskDesc}>{taskItems.taskDescription}</p>
                </div>
              </div>
              <div style={{
                              background: getPriorityBackgroundCol(
                                taskItems.taskStatus.toLowerCase()
                              ),
                              color: getPriorityCol(taskItems.taskStatus.toLowerCase()),
                            }}
                            className={styles.taskTags}>
                {taskItems.taskStatus.toLowerCase()}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noTaskMessage}>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Inprogress;
