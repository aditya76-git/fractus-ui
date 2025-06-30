import React from 'react'
import { useParams } from 'react-router-dom'
const Components = ({ meta }) => {
    const { id } = useParams()
    console.log(meta)
    return (
        <>
            <div>/docs/components/{id}</div>
        </>

    )
}

export default Components