import React from 'react';
import { NavLink } from 'react-router-dom';
const About = ()=>{
    return (
        <>
            <div className='row min-vh-100'>
                <div className='mt-5 box col-lg-6 col-md-8 col-10'>
                    <div className='text-center'>
                    <strong>
                        This is Description of the blog page assignment!
                    </strong>
                    </div>
                    <p className='mt-4'>
                        A reactjs Mongodb project of a blog page,where user can signup/signin
                        and read diff blogs uploaded by admin. users can like and comment in
                        any blogs which will be visible to all.
                        Admin has special access to write/edit blogs
                    </p>
                    <p>
                        Highlighting Properties
                    </p>
                
                    <ul>
                        <li>
                            Completely responsive
                        </li>
                        <li>
                            Loads Pages Dynamically without refreshing
                        </li>
                        <li>
                            Routes are Protected (jwt)
                        </li>
                        <li>
                            Form Validation
                        </li>
                        <li>
                            Uses MongoDb to for CRUD operations
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default About