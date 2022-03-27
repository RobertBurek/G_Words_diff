const dropdown = document.querySelector('.dropdown-option');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
// console.log(dropdownBtns);

function opendropdownItems() {
	if(this.nextElementSibling.classList.contains('dropdown-active')) {
		this.nextElementSibling.classList.remove('dropdown-active');
	} else {
		closedropdownItem();
		this.nextElementSibling.classList.toggle('dropdown-active');
	};
};

const closedropdownItem = () => {
	const allActiveItems = document.querySelectorAll('.dropdown-info');
	allActiveItems.forEach(item => item.classList.remove('dropdown-active'));
}

const clickOutsidedropdown = e => {
    if (e.target.classList.contains('dropdown-btn') ||
		e.target.hasAttribute('dropdown')
	) { 
        console.log(e.target);
	    // console.log(document.querySelector('[dropdown]').attributes[1]);

        return; }
	closedropdownItem();
};

dropdownBtns.forEach(btn => btn.addEventListener('click', opendropdownItems));

window.addEventListener('click', clickOutsidedropdown);
