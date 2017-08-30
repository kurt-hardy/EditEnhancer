class EditEnhancer {
    constructor(component) {
        this.component = component;
    }

    getCurrentValue = field => (
        this.component.state[field]
    );

    setByField = (field, value) => {
        this.component.setState((prevState) => {
            const edit = {
                ...prevState,
            };

            edit[field] = value;
            return {
                ...edit,
            };
        });
    };

    /**
     * setByPath will update any deep property inside an object including arrays.
     * To use this function, you need to pass in the name of the top level property,
     * the path to the deep object and the new value. You can also use this to
     * delete values or array indexes by passing nothing in.
     * E.G. const testObject = {
     *      property: {
     *          deepProperty :"value",
     *      },
     *      arrayProperty: [1, 2, 3, 4],
     *      objectArrayProperty: [
     *          { name: "name1", value: 1 },
     *          { name: "name2", value: 2 },
     *      ],
     * };
     * Edit property: setByPath("property", "deepProperty", "newValue")
     * Edit arrayProperty: setByPath("arrayProperty", "INDEX", "newValue")
     * Edit objectArrayProperty: setByPath("objectArrayProperty", "INDEX.name", "newValue")
     *
     * Delete arrayProperty: setByPath("arrayProperty", INDEX)
     * Delete objectArrayProperty: setByPath("objectArrayProperty", INDEX)
     */
    setByPath = (property, path, value) => {
        this.component.setState((prevState) => {
            const edit = {
                ...prevState,
            };

            const currentObject = this.getCurrentValue(property);
            this.traverse(currentObject, path.toString(), value);

            edit[property] = currentObject;

            return {
                ...edit,
            };
        });
    };

    traverse = (obj, path, value) => {
        const pathArray = path.split(".");
        let node = obj;
        for (let i = 0; i < pathArray.length - 1; i++) {
            const key = pathArray[i];
            if (!hasOwnProperty.call(node, key)) {
                node[key] = {};
            }
            node = node[key];
        }

        if (value !== undefined) {
            node[pathArray[pathArray.length - 1]] = value;
        } else {
            node.splice(pathArray[pathArray.length - 1], 1);
        }
    };
}

export default EditEnhancer;
