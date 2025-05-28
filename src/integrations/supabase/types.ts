export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      administradores: {
        Row: {
          created_at: string
          email: string
          id: string
          nome: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          nome: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nome?: string
          user_id?: string
        }
        Relationships: []
      }
      pesquisa_cannabis: {
        Row: {
          acompanhamento: string
          associacao: string
          caracteristicas_produto: string
          cid: string | null
          cpf_informante: string
          cpf_paciente: string
          created_at: string
          data_nascimento: string
          efeitos_colaterais: string
          escolaridade: string
          evolucao_internacoes: string
          evolucao_pronto_socorro: string
          evolucao_qualidade_vida: string
          evolucao_queixa_principal: string
          evolucao_saude: string
          fonte_produto: string
          forma_administracao: string
          forma_administracao_outra: string | null
          forma_aquisicao: string
          genero: string
          genero_outra: string | null
          gravidade_sintomas_antes: string
          id: string
          internacoes_antes: number
          interrompeu_medicamento: string
          medicamentos_antes: string[]
          medicamentos_antes_outra: string | null
          nome_associacao: string | null
          nome_informante: string
          nome_paciente: string
          observacoes: string | null
          problemas: string[]
          problemas_outra: string | null
          pronto_atendimento_antes: number
          qualidade_vida_antes: string
          raca: string
          raca_outra: string | null
          reduziu_dosagem: string
          renda: string
          satisfacao_saude_antes: string
          telefone: string
          tempo_uso: string
          tipos_efeitos_colaterais: string[] | null
          tipos_efeitos_colaterais_outra: string | null
          updated_at: string
        }
        Insert: {
          acompanhamento: string
          associacao: string
          caracteristicas_produto: string
          cid?: string | null
          cpf_informante: string
          cpf_paciente: string
          created_at?: string
          data_nascimento: string
          efeitos_colaterais: string
          escolaridade: string
          evolucao_internacoes: string
          evolucao_pronto_socorro: string
          evolucao_qualidade_vida: string
          evolucao_queixa_principal: string
          evolucao_saude: string
          fonte_produto: string
          forma_administracao: string
          forma_administracao_outra?: string | null
          forma_aquisicao: string
          genero: string
          genero_outra?: string | null
          gravidade_sintomas_antes: string
          id?: string
          internacoes_antes: number
          interrompeu_medicamento: string
          medicamentos_antes: string[]
          medicamentos_antes_outra?: string | null
          nome_associacao?: string | null
          nome_informante: string
          nome_paciente: string
          observacoes?: string | null
          problemas: string[]
          problemas_outra?: string | null
          pronto_atendimento_antes: number
          qualidade_vida_antes: string
          raca: string
          raca_outra?: string | null
          reduziu_dosagem: string
          renda: string
          satisfacao_saude_antes: string
          telefone: string
          tempo_uso: string
          tipos_efeitos_colaterais?: string[] | null
          tipos_efeitos_colaterais_outra?: string | null
          updated_at?: string
        }
        Update: {
          acompanhamento?: string
          associacao?: string
          caracteristicas_produto?: string
          cid?: string | null
          cpf_informante?: string
          cpf_paciente?: string
          created_at?: string
          data_nascimento?: string
          efeitos_colaterais?: string
          escolaridade?: string
          evolucao_internacoes?: string
          evolucao_pronto_socorro?: string
          evolucao_qualidade_vida?: string
          evolucao_queixa_principal?: string
          evolucao_saude?: string
          fonte_produto?: string
          forma_administracao?: string
          forma_administracao_outra?: string | null
          forma_aquisicao?: string
          genero?: string
          genero_outra?: string | null
          gravidade_sintomas_antes?: string
          id?: string
          internacoes_antes?: number
          interrompeu_medicamento?: string
          medicamentos_antes?: string[]
          medicamentos_antes_outra?: string | null
          nome_associacao?: string | null
          nome_informante?: string
          nome_paciente?: string
          observacoes?: string | null
          problemas?: string[]
          problemas_outra?: string | null
          pronto_atendimento_antes?: number
          qualidade_vida_antes?: string
          raca?: string
          raca_outra?: string | null
          reduziu_dosagem?: string
          renda?: string
          satisfacao_saude_antes?: string
          telefone?: string
          tempo_uso?: string
          tipos_efeitos_colaterais?: string[] | null
          tipos_efeitos_colaterais_outra?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calcular_idade: {
        Args: { data_nascimento: string }
        Returns: number
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
