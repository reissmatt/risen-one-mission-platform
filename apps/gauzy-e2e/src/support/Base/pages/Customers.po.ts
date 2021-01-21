import {
	verifyElementIsVisible,
	clickButtonByIndex,
	clickButton,
	clearField,
	enterInput,
	clickKeyboardBtnByKeycode,
	clickElementByText,
	waitElementToHide,
	verifyText,
	verifyTextNotExisting
} from '../utils/util';
import { CustomersPage } from '../pageobjects/CustomersPageObject';

export const gridBtnExists = () => {
	verifyElementIsVisible(CustomersPage.gridButtonCss);
};

export const gridBtnClick = (index) => {
	clickButtonByIndex(CustomersPage.gridButtonCss, index);
};

export const addButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.addButtonCss);
};

export const clickAddButton = () => {
	clickButton(CustomersPage.addButtonCss);
};

export const nameInputVisible = () => {
	verifyElementIsVisible(CustomersPage.nameInputCss);
};

export const enterNameInputData = (data) => {
	clearField(CustomersPage.nameInputCss);
	enterInput(CustomersPage.nameInputCss, data);
};

export const emailInputVisible = () => {
	verifyElementIsVisible(CustomersPage.emailInputCss);
};

export const enterEmailInputData = (data) => {
	clearField(CustomersPage.emailInputCss);
	enterInput(CustomersPage.emailInputCss, data);
};

export const phoneInputVisible = () => {
	verifyElementIsVisible(CustomersPage.phoneInputCss);
};

export const enterPhoneInputData = (data) => {
	clearField(CustomersPage.phoneInputCss);
	enterInput(CustomersPage.phoneInputCss, data);
};

export const countryDropdownVisible = () => {
	verifyElementIsVisible(CustomersPage.countryDropdownCss);
};

export const clickCountryDropdown = () => {
	clickButton(CustomersPage.countryDropdownCss);
};

export const selectCountryFromDropdown = (text) => {
	clickElementByText(CustomersPage.dropdownOptionCss, text);
};

export const cityInputVisible = () => {
	verifyElementIsVisible(CustomersPage.cityInpuCss);
};

export const enterCityInputData = (data) => {
	clearField(CustomersPage.cityInpuCss);
	enterInput(CustomersPage.cityInpuCss, data);
};

export const postcodeInputVisible = () => {
	verifyElementIsVisible(CustomersPage.postcodeinputCss);
};

export const enterPostcodeInputData = (data) => {
	clearField(CustomersPage.postcodeinputCss);
	enterInput(CustomersPage.postcodeinputCss, data);
};

export const streetInputVisible = () => {
	verifyElementIsVisible(CustomersPage.streetInputCss);
};

export const enterStreetInputData = (data) => {
	clearField(CustomersPage.streetInputCss);
	enterInput(CustomersPage.streetInputCss, data);
};

export const projectDropdownVisible = () => {
	verifyElementIsVisible(CustomersPage.projectsDropdownCss);
};

export const clickProjectDropdown = () => {
	clickButton(CustomersPage.projectsDropdownCss);
};

export const selectProjectFromDropdown = (text) => {
	clickElementByText(CustomersPage.projectsDropdownOptionCss, text);
};

export const selectEmployeeDropdownVisible = () => {
	verifyElementIsVisible(CustomersPage.usersMultyselectCss);
};

export const clickSelectEmployeeDropdown = () => {
	clickButton(CustomersPage.usersMultyselectCss);
};

export const selectEmployeeDropdownOption = (index) => {
	clickButtonByIndex(CustomersPage.dropdownOptionCss, index);
};

export const tagsMultyselectVisible = () => {
	verifyElementIsVisible(CustomersPage.addTagsDropdownCss);
};

export const clickTagsMultyselect = () => {
	clickButton(CustomersPage.addTagsDropdownCss);
};

export const selectTagsFromDropdown = (index) => {
	clickButtonByIndex(CustomersPage.tagsDropdownOption, index);
};

export const websiteInputVisible = () => {
	verifyElementIsVisible(CustomersPage.websiteInputCss);
};

export const enterWebsiteInputData = (data) => {
	clearField(CustomersPage.websiteInputCss);
	enterInput(CustomersPage.websiteInputCss, data);
};

export const clickKeyboardButtonByKeyCode = (keycode) => {
	clickKeyboardBtnByKeycode(keycode);
};

export const saveButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.saveButtonCss);
};

export const clickSaveButton = () => {
	clickButton(CustomersPage.saveButtonCss);
};

export const inviteButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.inviteButtonCss);
};

export const clickInviteButton = () => {
	clickButton(CustomersPage.inviteButtonCss);
};

export const saveInvitebuttonVisible = () => {
	verifyElementIsVisible(CustomersPage.saveInviteButtonCss);
};

export const clickSaveInviteButton = () => {
	clickButton(CustomersPage.saveInviteButtonCss);
};

export const tableRowVisible = () => {
	verifyElementIsVisible(CustomersPage.selectTableRowCss);
};

export const selectTableRow = (index) => {
	clickButtonByIndex(CustomersPage.selectTableRowCss, index);
};

export const editButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.editButtonCss);
};

export const clickEditButton = () => {
	clickButton(CustomersPage.editButtonCss);
};

export const deleteButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.deleteButtonCss);
};

export const clickDeleteButton = () => {
	clickButton(CustomersPage.deleteButtonCss);
};

export const confirmDeleteButtonVisible = () => {
	verifyElementIsVisible(CustomersPage.confirmDeleteButtonCss);
};

export const clickConfirmDeleteButton = () => {
	clickButton(CustomersPage.confirmDeleteButtonCss);
};

export const clickCardBody = () => {
	clickButton(CustomersPage.cardBodyCss);
};

export const waitMessageToHide = () => {
	waitElementToHide(CustomersPage.toastrMessageCss);
};

export const customerNameInputVisible = () => {
	verifyElementIsVisible(CustomersPage.customerNameCss);
};

export const enterCustomerNameData = (data) => {
	clearField(CustomersPage.customerNameCss);
	enterInput(CustomersPage.customerNameCss, data);
};

export const customerPhoneInputVisible = () => {
	verifyElementIsVisible(CustomersPage.customerPhoneCss);
};

export const enterCustomerPhoneData = (data) => {
	clearField(CustomersPage.customerPhoneCss);
	enterInput(CustomersPage.customerPhoneCss, data);
};

export const customerEmailInputVisible = () => {
	verifyElementIsVisible(CustomersPage.customerEmailCss);
};

export const enterCustomerEmailData = (data) => {
	clearField(CustomersPage.customerEmailCss);
	enterInput(CustomersPage.customerEmailCss, data);
};

export const verifyCustomerExists = (text) => {
	verifyText(CustomersPage.verifyCustomerCss, text);
};

export const verifyElementIsDeleted = (text) => {
	verifyTextNotExisting(CustomersPage.verifyCustomerCss, text);
};
