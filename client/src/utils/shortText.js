const shortText = (str, maxLength) => {
    return str.length > maxLength? str.substring(0, maxLength).trim() + '...' : str;
}

export default shortText;