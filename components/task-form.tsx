import { TaskFormValues } from "@/types/task";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TaskFormProps {
  initialValues?: TaskFormValues;
  submitButtonLabel?: string;
  onSubmit: (values: TaskFormValues) => void;
}

const initialErrors: FormErrors = {
  title: null,
  description: null,
  isUrgent: null,
  imageUri: null,
};

const initialForm: TaskFormValues = {
  title: "",
  description: "",
  isUrgent: false,
  imageUri: "",
};

type FormErrors = Record<keyof TaskFormValues, string | null>;

const foundErrors = (errors: FormErrors) => {
  return Object.values(errors).some((error) => error !== null);
};

const FormError = ({ error }: { error: string }) => {
  return <Text style={formErrorStyles.error}>{error}</Text>;
};

const formErrorStyles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 16,
  },
});

const isValidForm = (form: TaskFormValues) => {
  const errors: FormErrors = {
    ...initialErrors,
  };

  if (!form.title.trim()) {
    errors.title = "Title is required";
  }

  if (!form.description.trim()) {
    errors.description = "Description is required";
  }

  return {
    isValid: !foundErrors(errors),
    errors,
  };
};

export const TaskForm = ({
  initialValues,
  submitButtonLabel = "Create Task",
  onSubmit,
}: TaskFormProps) => {
  const [form, setForm] = useState<TaskFormValues>(
    initialValues || initialForm
  );
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  useEffect(() => {
    if (form !== initialForm) {
      const { errors } = isValidForm(form);
      setErrors(errors);
    }
  }, [form]);

  const handleSubmit = () => {
    const { isValid, errors } = isValidForm(form);
    if (!isValid) {
      setErrors(errors);
      return;
    } else {
      onSubmit(form);
      setForm(initialForm);
    }
  };

  const handleChange = (key: keyof TaskFormValues, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={form.title}
        autoCorrect={false}
        onChangeText={(text) => handleChange("title", text)}
        style={styles.textInput}
      />
      {errors.title && <FormError error={errors.title} />}
      <TextInput
        placeholder="Description"
        value={form.description}
        autoCorrect={false}
        onChangeText={(text) => handleChange("description", text)}
        style={styles.textInput}
      />
      {errors.description && <FormError error={errors.description} />}
      <Switch
        value={form.isUrgent}
        onValueChange={(value) => handleChange("isUrgent", value.toString())}
        style={styles.switch}
      />
      <TextInput
        placeholder="Image URI"
        value={form.imageUri || ""}
        autoCorrect={false}
        onChangeText={(text) => handleChange("imageUri", text)}
        style={styles.textInput}
      />
      {errors.imageUri && <FormError error={errors.imageUri} />}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{submitButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "gray",
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  switch: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
