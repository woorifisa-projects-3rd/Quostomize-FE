import ProfileImage1 from "../public/images/profile_image1.svg"
import ProfileImage2 from "../public/images/profile_image2.svg"
import ProfileImage3 from "../public/images/profile_image3.svg"
import ProfileImage4 from "../public/images/profile_image4.svg"
import ProfileImage5 from "../public/images/profile_image5.svg"
import ProfileImage6 from "../public/images/profile_image6.svg"

const RandomProfile = () => {
    const randomNumber = Math.floor(Math.random()*(6-1))+1;
    let profileImage;
    switch (randomNumber) {
        case 1:
            profileImage = <ProfileImage1 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        case 2:
            profileImage = <ProfileImage2 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        case 3:
            profileImage = <ProfileImage3 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        case 4:
            profileImage = <ProfileImage4 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        case 5:
            profileImage = <ProfileImage5 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        case 6:
            profileImage = <ProfileImage6 width="40" height="40" viewBox="0 0 60 60"/>
            break;
        default:
            profileImage = <ProfileImage1 width="40" height="40" viewBox="0 0 60 60"/>
            break;
    }


    return (
    <>
        {profileImage}
    </>
    );
};

export default RandomProfile;