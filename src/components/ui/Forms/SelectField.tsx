import { FC } from 'react';
import { Controller } from 'react-hook-form';

interface ISelectField {
    id: string;
    label: string;
    name: string;
    options: { _id: string; label: string }[];
    control: any;
    // eslint-disable-next-line
    validation: any;
    // eslint-disable-next-line
    error: any;
}

export const SelectField: FC<ISelectField> = ({
                                                  id,
                                                  label,
                                                  name,
                                                  options,
                                                  control,
                                                  validation,
                                                  error,
                                              }) => {
    return (
        <div className="m-2">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 dark:text-white"
            >
                {label}
            </label>
            <div className="mt-1 relative">
                <Controller
                    control={control}
                    name={name}
                    rules={validation}
                    render={({ field }) => (
                        <select
                            id={id}
                            {...field}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        >
                            <option value="" disabled hidden>
                                Select an option
                            </option>
                            {options.map((option) => (
                                <option key={option._id} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>
            {error && (
                <span className="font-medium px-1 mb-1 text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400">
          {error.message}
        </span>
            )}
        </div>
    );
};