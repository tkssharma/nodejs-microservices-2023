import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Todo {
  /**
   * Decorator prop is for database modelation and the second one type data is for model in typescript
   */
  @prop({ type: String })
  title: string;

  @prop({ type: String })
  description: string;

  @prop({ type: Boolean, default: false })
  done: boolean;
}

export default getModelForClass(Todo);
