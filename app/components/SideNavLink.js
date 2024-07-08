import Link from 'next/link';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const SideNavLink =({pathname, faIcon, path, label, uniqueKeyType}) => {
    const [uniqueKey, setUniqueKey] = useState('');
    const [newPath, setNewPath] = useState('');

    //useEffetch to fetch unique key
    useEffect(() => {
        const fetchUniqueKey = async () => {
            try{
                const response = await fetch(`/api/unique-keys?key=${uniqueKeyType}`);
                const data = await response.json();
                const key = data.data[0].company_overview_key;
                setUniqueKey(key);
                setNewPath(`${path}/${key}`);
            } catch (error) {
                console.error('Failed to fetch unique key:', error);
            }
        };

        if(uniqueKeyType){
            fetchUniqueKey();
        }else{
            setNewPath(path);
        }
    }, [uniqueKeyType]);

    return (
        <Link href={`${newPath}`} className={clsx(
            'nav-link',
            {
            'active': pathname === `${newPath}`,
            },
        )}>
            <FontAwesomeIcon icon={faIcon} /> {label}
        </Link>
    );
};

export default SideNavLink;
