import { columns } from './column';
import { DataTable } from './DataTable';
import { goats } from './mockGoats';
import NewGoatForm from './NewGoatForm';

const Goats = () => {
  return (
    <section className='h-full'>
      <div className='rounded-[20px]'>
        <DataTable
          columns={columns}
          data={goats}
          filename={'goats'}
          btnContent={'add new goat'}
          dialogBoxContent={<NewGoatForm />}
          filterColumn={'status'}
          filterPlaceholder={'Filter by status...'}
        />
      </div>
    </section>
  );
};

export default Goats;
