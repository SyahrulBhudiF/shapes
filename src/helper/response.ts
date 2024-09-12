interface response {
    message: string;
    data?: any;
}

function addData({message, data}: response): response {
    return {
        message: message,
        data: data,
    };
}

export default addData;