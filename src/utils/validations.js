const validateEditProfile = (body) => {
    const ALLOWED_FIELDS = ['firstName', 'lastName', 'skills', 'photoUrl','gender', 'age'];
    const isUpdateAlowed = Object.keys(body).every((k)=> ALLOWED_FIELDS.includes(k));
    return isUpdateAlowed;
}

const validateSendConnectionStatus = (status) => {
    const ALLOWED_STATUS = ['ignored', 'interested'];
    const isAllowedStatus = ALLOWED_STATUS.includes(status);
    return isAllowedStatus;
}

const validateReviewConnectionStatus = (status) => {
    const ALLOWED_STATUS = ['accepted', 'rejected'];
    const isAllowedStatus = ALLOWED_STATUS.includes(status);
    return isAllowedStatus;
}

const validateConnectionRequest = async function ({userConnection, }) {
    const connection = this;
    console.log({connection})
    isConnectionSend = (connection || []).find(({toUserId: tUID}) => tUID === toUserId) || false;
    console.log({isConnectionSend})
    return isConnectionSend;
  }

module.exports = {
    validateEditProfile,
    validateConnectionRequest,
    validateSendConnectionStatus,
    validateReviewConnectionStatus
}