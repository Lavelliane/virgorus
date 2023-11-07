import { Button } from '@nextui-org/react';
import { MdPhoneIphone, MdPhoneEnabled, MdEmail } from 'react-icons/md';
import { RiMessengerFill } from 'react-icons/ri';
import { contactsData } from '@/utils/data';


/* IF YOU WANT TO CHANGE THE CONTACTS DATA, GO TO utils/data.ts INSTEAD, THEN ADD CORRESPONDING ICON IN THE getIcon() FUNCTION */

export function ContactBar() {
  return (
    <div className="backdrop-blur-md bg-chocolate/80 w-full py-2">
      <div className="flex flex-col sm:flex-row justify-center gap-0 sm:gap-4 lg:gap-10 mx-0 lg:mx-96">
        {contactsData.map((contact) => (
          <div key={contact.key} className="flex justify-center gap-2 lg:gap-10">
            <div>
              <Button
                variant="flat"
                endContent={getContactIcon(contact.key)}
                className="font-medium text-xs lg:text-base h-4 sm:h-8"
              >
                {contact.value}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getContactIcon(key: string) {
  switch (key) {
    case 'telephone':
      return <MdPhoneIphone />;
    case 'mobile':
      return <MdPhoneEnabled />;
    case 'email':
      return <MdEmail />;
	case 'messenger':
	  return <RiMessengerFill />
    default:
      return null;
  }
}
