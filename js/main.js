async function setAndGetToServer() {
    await setTasksToServer();
    await getTasksFromServer();
}