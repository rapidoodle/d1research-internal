'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if(term){
      params.set('query', term);
    }else{
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="container d-flex align-items-center justify-content-end">
    <span className='me-2 d-none d-md-block'>Search:</span> 
      <div className="input-group mw-250">
        <span className="input-group-text" id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input type='text' className='form-control form-control-sm'
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      </div>
    </div>
  );
}
