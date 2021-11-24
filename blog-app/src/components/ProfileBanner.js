

function ProfileBanner(props)
{
    console.log(props)
    return <>
        <div className="profile-banner" >
            <figure>
                <img src={props.user.image} alt={props.user.username} />
            </figure>
            <h3>{props.user.username}</h3>

        </div>
    </>
}

export default ProfileBanner