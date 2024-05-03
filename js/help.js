async function initHelp() {
    await getCurrentUserIdFromServer();
    await setUserInitialsAtHeader();
}