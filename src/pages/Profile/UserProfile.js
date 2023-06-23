import React, { useContext } from 'react';
import './UserProfile.css'
import  {AuthContext} from '../../AuthProvider';

function UserProfile (props){
    const {currentUser} =  useContext(AuthContext);
    
    console.log("User",currentUser);
    // console.log("User Props",props);
	return (
        <div className='wrap_profile'>
            <h2>User Profile</h2>
            { currentUser?.displayName ?
                <>
                    <table className='table border'>
                        <tbody>
                            <tr>
                                <td>
                                    <tr>
                                        <th>User Image</th>
                                    </tr>  
                                    <tr>  
                                        <th>User Id</th>
                                    </tr>  
                                    <tr>
                                        <th>User Name</th>
                                    </tr>  
                                    <tr>
                                        <th>User Email</th>
                                    </tr>  
                                    <tr>
                                        <th>Profile Created time</th>
                                    </tr>
                                </td>
                                <td>
                                    <tr>
                                        <td>
                                            <img loading="lazy" width="60px" height="60px" src={currentUser?.photoURL} alt={currentUser?.displayName} />
                                        </td>
                                    </tr>  
                                    <tr>
                                        <td>{currentUser?.uid}</td>
                                    </tr>  
                                    <tr>
                                        <td>{currentUser?.displayName}</td>
                                    </tr>  
                                    <tr>
                                        <td>{currentUser?.email}</td>
                                    </tr>  
                                    <tr>
                                        <td>{currentUser?.metadata.creationTime}</td>
                                    </tr>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
                :
                <p>Loading</p>
            }
        </div>
    )
}

export default UserProfile;
