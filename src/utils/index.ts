export const checkIfImage = (img: File) => {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];


    console.log()
    if (!acceptedImageTypes.includes(img['type'])){
        alert('not an image');
        return false;
    }
    return true;
};