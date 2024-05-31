import React, { useState } from 'react'
import ViewPerPageSelector from './ViewPerPageSelector'
import ContactTable from './ContactTable';
import './../../styles/components/home/contactTableWindow.scss'
import TablePaggingElement from './TablePaggingElement';
import useContactsContext from '../../hooks/useContactContext';

const ContactTableWindow = ({}) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const [viewPerPage, setViewPerPage] = useState(5);
    const { contacts } = useContactsContext();

    const handlePageChange = (newPage) => {
        setSelectedPage(newPage);
        console.log('Selected page:', newPage);
    };

    const handleViewPerPageChange = (newValue) => {
        setViewPerPage(newValue);
        setSelectedPage(1);
    };

  return (
    <div className='contact-table-window'>
        <div className="contact-table-window-top-segemnt">
            <h2>
                Pregled kontakata
            </h2>
            <div>
                <ViewPerPageSelector handleValueOnChange={handleViewPerPageChange}/>
            </div>
        </div>
        <ContactTable viewPerPage={viewPerPage} pageNumber={selectedPage}/>
        <TablePaggingElement
            currentPage={selectedPage} 
            totalPages={Math.ceil(contacts.length / viewPerPage)} 
            handlePageChange={handlePageChange}
        />
    </div>
  )


}

export default ContactTableWindow
