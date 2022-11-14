// Oppen settings-user
const open = document.getElementById('open_Settings');
if (open) {
    open.addEventListener('click', () => {
        document.getElementById('Box_User_Settings').classList.toggle('inactive');
    });
}
// Close click body
const body = document.getElementById('body');
body.addEventListener('click', (e) => {
    if (!e.target.matches('#open_Settings')) {
        document.getElementById('Box_User_Settings').classList.add('inactive');
    }
});