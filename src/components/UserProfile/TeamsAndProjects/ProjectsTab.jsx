import React, { useState } from 'react';
import postProjectPopup from './AddProjectPopup';
import UserProjectsTable from './UserProjectsTable';

const ProjectsTab = props => {
  const {
    projectsData,
    userProjects,
    onDeleteProject,
    onAssignProject,
    edit,
    role,
    userTasks,
    userId,
    updateTask,
  } = props;
  const [postProjectPopupOpen, setPostProjectPopupOpen] = useState(false);
  const [renderedOn, setRenderedOn] = useState(0);
  const onSelectDeleteProject = projectId => {
    onDeleteProject(projectId);
  };

  const onSelectAssignProject = project => {
    onAssignProject(project);
    setRenderedOn(Date.now());
    //setPostProjectPopupOpen(false);
  };

  const onAddProjectPopupShow = () => {
    setPostProjectPopupOpen(true);
  };

  const onAddProjectPopupClose = () => {
    setPostProjectPopupOpen(false);
  };

  return (
    <React.Fragment>
      <postProjectPopup
        open={postProjectPopupOpen}
        onClose={onAddProjectPopupClose}
        userProjectsById={userProjects}
        projects={projectsData}
        onSelectAssignProject={onSelectAssignProject}
      />
      <UserProjectsTable
        userTasks={userTasks}
        userProjectsById={userProjects}
        onButtonClick={onAddProjectPopupShow}
        onDeleteClicK={onSelectDeleteProject}
        renderedOn={renderedOn}
        edit={edit}
        role={role}
        updateTask={updateTask}
        userId={userId}
      />
    </React.Fragment>
  );
};

export default ProjectsTab;
